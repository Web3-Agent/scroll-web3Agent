const _promptForToken = `
Develop a Solidity smart contract to implement the following approach for the web application:
Approach Heading: __HEADING__
Approach Content:   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}
}

Additional Details: Use "Approach Content" for generation of code, and implement following functionality: __FEATURE__

Your task is to provide the Solidity code for the smart contract that will effectively integrate this approach into the web application. 
Include relevant functions, variables, and any necessary logic to ensure the successful implementation of the specified feature.
Ensure that the generated Solidity code:
1. Compiles without errors.
2. Is complete and ready for deployment.
3. The version of Solidity used is "0.8.20" and SPDX-License-Identifier should be "MIT".
     
Note: Consider best practices and security considerations for smart contracts during the development. Don't return any explaination. Just return code only.
`

const _promptForNFT = `
Develop a Solidity smart contract to implement the following approach for the web application:
Approach Heading: __HEADING__
Approach Content:   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.1/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.1/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts@5.0.1/token/ERC721/extensions/ERC721Votes.sol";

contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Pausable, Ownable, ERC721Burnable, EIP712, ERC721Votes {
    uint256 private _nextTokenId;

    constructor(address initialOwner)
        ERC721("MyToken", "MTK")
        Ownable(initialOwner)
        EIP712("MyToken", "1")
    {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable, ERC721Pausable, ERC721Votes)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable, ERC721Votes)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}


Additional Details: Use "Approach Content" for generation of code, and implement following functionality: __FEATURE__

Your task is to provide the Solidity code for the smart contract that will effectively integrate this approach into the web application. 
Include relevant functions, variables, and any necessary logic to ensure the successful implementation of the specified feature.
Ensure that the generated Solidity code:
1. Compiles without errors.
2. Is complete and ready for deployment.
3. The version of Solidity used is "0.8.20" and SPDX-License-Identifier should be "MIT".
     
Note: Consider best practices and security considerations for smart contracts during the development.
`

const _promptForStaking = `
Develop a Solidity smart contract to implement the following approach for the web application:
Approach Heading: __HEADING__
Approach Content:   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Token to be staked
    IERC20 public stakingToken;

    // Staking duration
    uint256 public stakingDuration;

    // Staking start time
    uint256 public stakingStartTime;

    // Total staked amount
    uint256 public totalStaked;

    // User staking information
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakingTimestamps;

    // Reward rate per second (adjustable based on total staked amount)
    uint256 public rewardRate;

    // Accumulated rewards per staked token
    mapping(address => uint256) public accumulatedRewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);

    constructor(
        IERC20 _stakingToken,
        uint256 _stakingDuration,
        uint256 _rewardRate
    ) {
        stakingToken = _stakingToken;
        stakingDuration = _stakingDuration;
        rewardRate = _rewardRate;
        stakingStartTime = block.timestamp;
    }

    modifier updateReward(address account) {
        accumulatedRewards[account] = earned(account);
        stakingTimestamps[account] = block.timestamp;
        _;
    }

    function earned(address account) public view returns (uint256) {
        uint256 elapsedTime = block.timestamp.sub(stakingTimestamps[account]);
        return stakedBalances[account].mul(elapsedTime).mul(rewardRate).div(1e18);
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(block.timestamp < stakingStartTime.add(stakingDuration), "Staking period has ended");

        stakingToken.safeTransferFrom(msg.sender, address(this), amount);
        stakedBalances[msg.sender] = stakedBalances[msg.sender].add(amount);
        totalStaked = totalStaked.add(amount);

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(stakedBalances[msg.sender] >= amount, "Insufficient staked balance");

        stakedBalances[msg.sender] = stakedBalances[msg.sender].sub(amount);
        totalStaked = totalStaked.sub(amount);

        stakingToken.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function claimReward() external updateReward(msg.sender) {
        uint256 reward = accumulatedRewards[msg.sender];
        require(reward > 0, "No rewards to claim");

        accumulatedRewards[msg.sender] = 0;
        stakingToken.safeTransfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }

    function emergencyWithdraw() external {
        require(block.timestamp >= stakingStartTime.add(stakingDuration), "Staking period has not ended");
        uint256 amount = stakedBalances[msg.sender];

        stakedBalances[msg.sender] = 0;
        totalStaked = totalStaked.sub(amount);

        stakingToken.safeTransfer(msg.sender, amount);

        emit EmergencyWithdraw(msg.sender, amount);
    }

    // Owner function to adjust the reward rate
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
    }
}


Additional Details: Use "Approach Content" for generation of code, and implement following functionality: __FEATURE__

Your task is to provide the Solidity code for the smart contract that will effectively integrate this approach into the web application. 
Include relevant functions, variables, and any necessary logic to ensure the successful implementation of the specified feature.
Ensure that the generated Solidity code:
1. Compiles without errors.
2. Is complete and ready for deployment.
3. The version of Solidity used is "0.8.20" and SPDX-License-Identifier should be "MIT".
     
Note: Consider best practices and security considerations for smart contracts during the development.
`

const _promptForFarming = `Develop a Solidity smart contract to implement the following approach for the web application:
Approach Heading: __HEADING__
Approach Content:   
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract FarmToken is ERC20, ERC20Burnable, ERC20Pausable, ERC20Snapshot, ERC20Votes, Ownable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;

    // The token used for staking
    IERC20 public stakingToken;

    // Mapping from account address to their current stake
    mapping(address => uint256) private _stakes;

    // Mapping from account address to the time of their last unstake
    mapping(address => uint256) private _lastUnstakeTime;

    // Total staked tokens
    uint256 private _totalStaked;

    // Duration for which the user must wait after unstaking before being able to stake again
    uint256 public unstakeCooldownPeriod;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(
        string memory name,
        string memory symbol,
        address _stakingToken,
        uint256 _unstakeCooldownPeriod
    ) ERC20(name, symbol) {
        stakingToken = IERC20(_stakingToken);
        unstakeCooldownPeriod = _unstakeCooldownPeriod;
    }

    // Stake tokens to earn rewards
    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(stakingToken.balanceOf(msg.sender) >= amount, "Not enough tokens to stake");

        _updateCooldown(msg.sender);

        // Transfer tokens from the user to the contract
        stakingToken.safeTransferFrom(msg.sender, address(this), amount);

        // Mint new tokens to the user
        _mint(msg.sender, amount);

        // Update the user's stake
        _stakes[msg.sender] = _stakes[msg.sender].add(amount);
        _totalStaked = _totalStaked.add(amount);

        emit Staked(msg.sender, amount);
    }

    // Unstake tokens and claim rewards
    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(_stakes[msg.sender] >= amount, "Not enough staked tokens");
        require(_canUnstake(msg.sender), "Cooldown period has not elapsed");

        // Burn tokens from the user
        _burn(msg.sender, amount);

        // Transfer staked tokens back to the user
        stakingToken.safeTransfer(msg.sender, amount);

        // Update the user's stake
        _stakes[msg.sender] = _stakes[msg.sender].sub(amount);
        _totalStaked = _totalStaked.sub(amount);
        _lastUnstakeTime[msg.sender] = block.timestamp;

        emit Unstaked(msg.sender, amount);
    }

    // Get the user's current stake
    function stakeOf(address account) external view returns (uint256) {
        return _stakes[account];
    }

    // Get the total staked tokens
    function totalStaked() external view returns (uint256) {
        return _totalStaked;
    }

    // Check if the user can unstake based on the cooldown period
    function _canUnstake(address account) internal view returns (bool) {
        return block.timestamp >= _lastUnstakeTime[account] + unstakeCooldownPeriod;
    }

    // Update cooldown timestamp
    function _updateCooldown(address account) internal {
        if (!_canUnstake(account)) {
            _lastUnstakeTime[account] = block.timestamp;
        }
    }
}
`

export const getTokenPrompt = (request: any) => {
    let prompt = _promptForToken
    let __HEADING__ = 'NEWTAJ Token with symbol name NTJ';
    if (request.additionDetails) {
        __HEADING__ = request.additionDetails
    }
    let __FEATURE__ = 'ERC20 token'
    if (request.featuresRequest && request?.featuresRequest?.length) {
        __FEATURE__ = request?.featuresRequest.join(', ')
    }
    prompt = prompt.replace('__HEADING__', __HEADING__);
    prompt = prompt.replace('__FEATURE__', __FEATURE__);
    return prompt;
}

export const getNFTPrompt = (request: any) => {
    let prompt = _promptForNFT
    let __HEADING__ = 'Smart contracts for NFT have all the functionality.';
    if (request.additionDetails) {
        __HEADING__ = request.additionDetails
    }
    let __FEATURE__ = 'ERC-721 token'
    if (request.featuresRequest && request?.featuresRequest?.length) {
        __FEATURE__ = request?.featuresRequest.join(', ')
    }
    prompt = prompt.replace('__HEADING__', __HEADING__);
    prompt = prompt.replace('__FEATURE__', __FEATURE__);
    return prompt;
}

export const getStakingPrompt = (request: any) => {
    let prompt = _promptForStaking
    let __HEADING__ = 'Smart contracts for Staking have all the functionality.';
    if (request.additionDetails) {
        __HEADING__ = request.additionDetails
    }
    let __FEATURE__ = 'Staking basic functions'
    if (request.featuresRequest && request?.featuresRequest?.length) {
        __FEATURE__ = request?.featuresRequest.join(', ')
    }
    prompt = prompt.replace('__HEADING__', __HEADING__);
    prompt = prompt.replace('__FEATURE__', __FEATURE__);
    return prompt;
}

export const getFarmPrompt = (request: any) => {
    let prompt = _promptForFarming
    let __HEADING__ = 'Smart contracts for Farm have all the functionality.';
    if (request.additionDetails) {
        __HEADING__ = request.additionDetails
    }
    let __FEATURE__ = 'Farm basic functions'
    if (request.featuresRequest && request?.featuresRequest?.length) {
        __FEATURE__ = request?.featuresRequest.join(', ')
    }
    prompt = prompt.replace('__HEADING__', __HEADING__);
    prompt = prompt.replace('__FEATURE__', __FEATURE__);
    return prompt;
}

export default { getTokenPrompt, getNFTPrompt, getStakingPrompt, getFarmPrompt }