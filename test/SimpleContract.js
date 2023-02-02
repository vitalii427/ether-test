const { ethers } = require("hardhat");
const { utils, BigNumber } = ethers;
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("SimpleContract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployDefaultFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SimpleContract = await ethers.getContractFactory("SimpleContract");
    const simple = await SimpleContract.deploy();

    return { simple, owner, otherAccount };
  }

  describe("Tests", function () {
    it("Should set zero balance", async function () {
      const { simple } = await loadFixture(deployDefaultFixture);

      expect(await simple.getETHBalance()).to.equal(0);
    });

    it("Should set the right owner", async function () {
      const { simple, owner } = await loadFixture(deployDefaultFixture);

      expect(await simple.owner()).to.equal(owner.address);
    });
  });

  describe("Withdrawals", function () {
    it("Should revert when balance is zero", async function () {
      const { simple } = await loadFixture(deployDefaultFixture);

      await expect(simple.withdraw()).to.be.revertedWith(
        "Nothing to withdraw"
      );
    });

    it("Balance should be equal to transferred amount", async function () {
      const { simple, otherAccount } = await loadFixture(deployDefaultFixture);

      const amount = utils.parseEther("1");

      // Transfer 1 ETH to the contract
      await otherAccount.sendTransaction({ to: simple.address, value: amount });

      await expect(simple.getETHBalance()).to.eventually.equal(utils.formatUnits(amount, "wei"));
    });

    it("Should transfer all ETH balance to the owner", async function () {
      const { simple, owner, otherAccount } = await loadFixture(deployDefaultFixture);

      const amount = utils.parseEther("1");

      // Transfer 1 ETH to the contract
      await otherAccount.sendTransaction({ to: simple.address, value: amount });

      const zero = BigNumber.from(0);
      await expect(simple.withdraw()).to.changeEtherBalances(
        [owner, simple],
        [amount, zero.sub(amount)]
      );
    });

    it("Should transfer 10% ETH balance to non owner", async function () {
      const { simple, otherAccount } = await loadFixture(deployDefaultFixture);

      const amount = utils.parseEther("1");

      // Transfer 1 ETH to the contract
      await otherAccount.sendTransaction({ to: simple.address, value: amount });

      const amountDiv10 = amount.div(BigNumber.from(10))

      const zero = BigNumber.from(0);
      await expect(simple.connect(otherAccount).withdraw()).to.changeEtherBalances(
        [otherAccount, simple],
        [amountDiv10, zero.sub(amountDiv10)]
      );
    });
  });
});
