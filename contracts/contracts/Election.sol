pragma solidity 0.4.24;

contract Election  {
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }
    mapping(address => bool) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;

    constructor () public {
        addCandidate("Candidate #1", "empire");
        addCandidate("Candidate #2", "republic");
    }

    function addCandidate (string memory _name, string memory _party) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
    }

    function vote (uint _candidateId) public {
        require(_candidateId > 0 && _candidateId <= candidatesCount,"Invalid candidate");

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;
    }
}