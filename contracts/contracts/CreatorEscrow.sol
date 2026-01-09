// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreatorEscrow {
    enum State { FUNDED, DELIVERED, DISPUTED, RELEASED, REFUNDED }

    struct Agreement {
        address brand;
        address creator;
        uint256 amount;
        bytes32 rulesHash;
        State state;
        uint256 createdAt;
        uint256 disputeDeadline;
    }

    IERC20 public immutable mnee;
    uint256 public agreementCount;
    mapping(uint256 => Agreement) public agreements;
    
    // Reputation tracking
    mapping(address => uint256) public creatorCompletedCount;
    mapping(address => uint256) public creatorTotalEarnings;

    uint256 public constant DISPUTE_TIMEOUT = 3 days;

    event AgreementCreated(uint256 indexed id, address brand, address creator, uint256 amount);
    event ProofSubmitted(uint256 indexed id, bytes32 proofHash);
    event FundsReleased(uint256 indexed id);
    event Disputed(uint256 indexed id);
    event Refunded(uint256 indexed id);

    constructor(address _mnee) {
        mnee = IERC20(_mnee);
    }

    function createAgreement(address creator, uint256 amount, bytes32 rulesHash) external returns (uint256) {
        require(mnee.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        uint256 id = agreementCount++;
        agreements[id] = Agreement({
            brand: msg.sender,
            creator: creator,
            amount: amount,
            rulesHash: rulesHash,
            state: State.FUNDED,
            createdAt: block.timestamp,
            disputeDeadline: 0
        });

        emit AgreementCreated(id, msg.sender, creator, amount);
        return id;
    }

    function submitProof(uint256 id, bytes32 proofHash) external {
        Agreement storage a = agreements[id];
        require(a.state == State.FUNDED, "Invalid state");
        
        a.state = State.DELIVERED;
        a.disputeDeadline = block.timestamp + DISPUTE_TIMEOUT;
        
        emit ProofSubmitted(id, proofHash);
    }

    function releaseFunds(uint256 id) external {
        Agreement storage a = agreements[id];
        require(a.state == State.DELIVERED, "Not delivered");
        require(
            msg.sender == a.brand || block.timestamp > a.disputeDeadline,
            "Not authorized or timeout not reached"
        );

        a.state = State.RELEASED;
        creatorCompletedCount[a.creator]++;
        creatorTotalEarnings[a.creator] += a.amount;
        require(mnee.transfer(a.creator, a.amount), "Transfer failed");
        
        emit FundsReleased(id);
    }

    function dispute(uint256 id) external {
        Agreement storage a = agreements[id];
        require(msg.sender == a.brand, "Only brand");
        require(a.state == State.DELIVERED, "Not delivered");
        require(block.timestamp <= a.disputeDeadline, "Timeout passed");

        a.state = State.DISPUTED;
        emit Disputed(id);
    }

    function resolveDispute(uint256 id, bool releaseToCreator) external {
        Agreement storage a = agreements[id];
        require(a.state == State.DISPUTED, "Not disputed");
        require(msg.sender == a.brand, "Only brand");

        if (releaseToCreator) {
            a.state = State.RELEASED;
            creatorCompletedCount[a.creator]++;
            creatorTotalEarnings[a.creator] += a.amount;
            require(mnee.transfer(a.creator, a.amount), "Transfer failed");
            emit FundsReleased(id);
        } else {
            a.state = State.REFUNDED;
            require(mnee.transfer(a.brand, a.amount), "Transfer failed");
            emit Refunded(id);
        }
    }

    function getAgreement(uint256 id) external view returns (Agreement memory) {
        return agreements[id];
    }
    
    function getCreatorReputation(address creator) external view returns (uint256 completed, uint256 earnings) {
        return (creatorCompletedCount[creator], creatorTotalEarnings[creator]);
    }
}
