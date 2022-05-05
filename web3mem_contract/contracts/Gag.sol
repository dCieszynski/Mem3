// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Gag {
    
    constructor() {
        console.log("Contract deployed");
    }

    event newImage(address indexed from, string imageUrl, uint256 timestamp, uint256 likes);
    event updateLikes(uint256 likes);

    struct Image {
        address sender;
        string imageUrl;
        uint256 timestamp;
        uint256 likes;
    }

    Image[] images;

    function sendImage(string memory _imageUrl) public {
        console.log("%s has send image! Image url: %s", msg.sender, _imageUrl);
        images.push(Image(msg.sender, _imageUrl, block.timestamp, 0));
        emit newImage(msg.sender, _imageUrl, block.timestamp, 0);
    }

    function getAllImages() public view returns(Image[] memory) {
        return images;
    }

    function like(uint _id) public {
        Image storage _image = images[_id];
        _image.likes = _image.likes + 1;
        console.log("%s has been liked! Image likes: %s", _image.imageUrl, _image.likes);
        emit updateLikes(_image.likes);
    }
}