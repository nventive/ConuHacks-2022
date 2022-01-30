pragma experimental ABIEncoderV2;
pragma solidity 0.4.24;

contract Election  {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }

    address[] private admins;
    uint private adminCount;
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    bool public isElectionLive;

    constructor () public {
        addCandidate("Candidate #1", "empire");
        addCandidate("Candidate #2", "republic");

        // Safely make the creator of the contract an admin
        admins.push(msg.sender);
        adminCount++;

        // Start the election
        isElectionLive = true;
    }

    function addCandidate (string memory _name, string memory _party) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
    }

    function vote (uint _candidateId) public {
        require(isElectionLive, "Election has ended");
        require(voters[msg.sender] == false, "A single vote may be cast.");
        require(_candidateId > 0 && _candidateId <= candidatesCount,"Invalid candidate");

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;
    }

    function canVote () public view returns (bool){
        return voters[msg.sender] && isElectionLive;
    }

    // Keep this mapping small in length to avoid high gas fees.
    function retrieveCandidates () view returns (Candidate[] memory) {
        Candidate[] memory memoryArray = new Candidate[](candidatesCount);
        for(uint i = 0; i < candidatesCount; i++) {
            memoryArray[i] = candidates[i+1];
        }
        return memoryArray;
    }

    // Same as above
    function isAdmin () view returns (bool) {
        for(uint i = 0; i < adminCount; i++) {
            if(admins[i+1] == msg.sender) {
                return true;
            }
        }

        return false;
    }

    function endElection() {
        require(isAdmin(), "Only an Admin can end the election.");
        isElectionLive = false;
    }

    // Bonus Feature: Could do with extra time.
    function addAdmin (address _newAdmin) {
        require(isAdmin(), "Only an Admin can add an Admin.");
        admins.push(_newAdmin);
        adminCount++;
    }
}