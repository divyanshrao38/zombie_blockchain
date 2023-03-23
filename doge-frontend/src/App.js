import React, { useState, useEffect, useMemo  } from 'react';
import {cryptoZombiesABI} from './cryptozombies_abi.js';
import Web3 from 'web3';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button,Modal, Form, Container, Toast  } from 'react-bootstrap';
import Navbar from './Navbar';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

import './App.css';

const cryptoZombiesAddress = '0x4C8cC4B13b20F3779E87D2a08888A1c6d7dEf083';
const webt = new Web3(window.ethereum)
const cryptoZombies = new webt.eth.Contract(cryptoZombiesABI, cryptoZombiesAddress);

function Zombie({ zombieId, userAccount, handleLevelUpCallback }) {
  const [zombieData, setZombieData] = useState(null);
  const [sprite, setSprite] = useState("lorelei");
  
  useEffect(() => {
    async function fetchZombieData() {
      const zombie = await cryptoZombies.methods.zombies(zombieId).call() ;
      setZombieData(zombie);
      console.log("id===>>",zombie)
    }
    fetchZombieData();
  }, [zombieId]);

  const getZombieAvtar = ()=>{
     console.log("sse")
  }

  const avatar = createAvatar(lorelei, {
      "seed": zombieData ?zombieData?.dna+ zombieData?.level : "test" ,
      flip: false,
      backgroundColor: ["b6e3f4","c0aede","d1d4f9"],
      backgroundType: ["gradientLinear","solid"],
      backgroundRotation: [0,360],
      randomizeIds: true,
      beard: ["variant01","variant02"],
      beardProbability: 15,
      earrings: ["variant01","variant02","variant03"],
      earringsProbability: 25,
      eyebrows: ["variant01","variant02","variant03"],
      eyes: ["variant01","variant02","variant03"],
      freckles: ["variant01"],
      frecklesProbability: 50,
      glasses: ["variant01","variant02","variant03"],
      hair: ["variant01","variant02","variant03"],
      hairAccessories: ["flowers"],
      hairAccessoriesProbability: 50,
      head: ["variant01","variant02","variant03"],
      mouth: ["happy01","happy02","happy03","happy04","happy05","happy06","happy07","happy08","happy09"],
      nose: ["variant01","variant02","variant03"],
      size: 150,
    }).toDataUriSync();


  if (!zombieData) {
    return <div>Loading...</div>;
  }
  const handleLevelUp = async () => {
    try {
      //setTxStatus("Leveling up your zombie...");
      await cryptoZombies.methods.levelUp(zombieId).send({
        from: userAccount,
        value: Web3.utils.toWei("0.001", "ether")
      }).then(data =>{
        setZombieData({...zombieData,level: Number(zombieData.level) +1  })
      })
      
      //setTxStatus("Power overwhelming! Zombie successfully leveled up");
    } catch (error) {
      //setTxStatus(error.message);
      console.log(error)
    }
  };
  return (
    <div className="zombie">
       <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={avatar} />
      <Card.Body>
        <Card.Title>{zombieData.name}</Card.Title>
        <Card.Text><ul>
        <li>Name: {zombieData.name}</li>
        <li>DNA: {zombieData.dna}</li>
        <li>Level: {zombieData.level}</li>
        <li>Wins: {zombieData.winCount}</li>
        <li>Losses: {zombieData.lossCount}</li>
        <li>Ready Time: {zombieData.readyTime}</li>
      </ul></Card.Text>
        <Button variant="secondary" onClick={()=>handleLevelUp()}>Level Up</Button>
      </Card.Body>
    </Card>
      
    </div>
  );
}


function ZombieList({ userAccount, zombieIds }) {
  const [zombies, setZombies] = useState([]);

  useEffect(() => {
    async function fetchZombies() {
      const ids = await cryptoZombies.methods.getZombiesByOwner(userAccount).call();
      setZombies([...ids]);
      console.log("zombie",zombies)
    }
    fetchZombies();
  }, [userAccount, zombieIds]);

  var handleLevelUpCallback = ()=>{
    let temp = zombies
    setZombies([]).then(setZombies(temp))
  }

  return (
    <Container fluid className="card-container">
      {zombies?.map(zombieId => (
        <Zombie key={zombieId} zombieId={zombieId} userAccount={userAccount} handleLevelUpCallback={handleLevelUpCallback}/>
      ))}
    </Container>
  );
}

function App() {
  const [userAccount, setUserAccount] = useState(null);
  const [modal, setModal] = useState(false);
  const [newZombieName, setNewZombieName] = useState("");
  const [currentZombieId,setCurrentZombieId]  = useState([])
  const [balanceModal, setBalanceModal] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [balanceInfo, setBalanceInfo] = useState("");

  useEffect(() => {
    async function connectWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await window.web3.eth.getAccounts();
          setUserAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        const accounts = await window.web3.eth.getAccounts();
        setUserAccount(accounts[0]);
      } else {
        console.error('Web3 not found');
      }
    }
    connectWeb3();
  }, []);

  if (!userAccount) {
    return <div>Connecting to Web3...</div>;
  }
  const handleClose = () => {
    setModal(false)
    setNewZombieName("")
  };

  const handleOwnerClose = () =>{
    setBalanceModal(false)
    setBalanceInfo("")
    setAccountAddress("")
  }

  const handleCreate = () => {
    setModal(false)
    createRandomZombie(newZombieName)
    
  };
  const handleShow = () => setModal(true);
  const handleCreateZombies = ()=>{
    handleShow()
  }
  const handleInputChange = (event) => {
    setNewZombieName(event.target.value);
  };

  const handleAccountInputChange = (event) => {
    setAccountAddress(event.target.value);
  };

  const handleShowOwner = () =>{
    console.log("hereee")
    setBalanceModal(true)
  }

  async function handleShowOwnerCreate  (){
    try{
      var balanceOfResult = await cryptoZombies.methods.ownerOf(accountAddress).call();
      console.log(balanceOfResult)
      setBalanceInfo(<div>
        Owner Address : {balanceOfResult}
      </div>)
    }
    catch (error){
      console.log(error)
    }
  }

  // const handleLevelUp = async (zombieId) => {
  //   try {
  //     //setTxStatus("Leveling up your zombie...");
  //     await cryptoZombies.methods.levelUp(zombieId).send({
  //       from: userAccount,
  //       value: Web3.utils.toWei("0.001", "ether")
  //     });
  //     //setTxStatus("Power overwhelming! Zombie successfully leveled up");
  //   } catch (error) {
  //     //setTxStatus(error.message);
  //   }
  // };

  async function createRandomZombie(name) {
    try {
      // Send the transaction
      const receipt = await cryptoZombies.methods.createRandomZombie(name).send({ from: userAccount });

  
      // Get the updated zombie list and display it
      const ids = await cryptoZombies.methods.getZombiesByOwner(userAccount).call();
      setCurrentZombieId([...ids])
      // setZombies(ids);
    } catch (error) {
      // Set an error message
      // setTxStatus(error);
      console.log(error)
    }
  }
  return (
    <div>
       <Modal show={modal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Zombie Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formZombieName">
            <Form.Label>Zombie Name:</Form.Label>
            <Form.Control type="text" placeholder="Enter zombie name" value={newZombieName} onChange={handleInputChange} />
          </Form.Group>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* show owner modal */}

      <Modal show={balanceModal} onHide={handleOwnerClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Zombie Id</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formAccountaddresss">
            <Form.Label>Zombie Id:</Form.Label>
            <Form.Control type="text" placeholder="Enter Zombie id" value={accountAddress} onChange={handleAccountInputChange} />
          </Form.Group>
          {balanceInfo}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowOwnerCreate}>
            Check
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar handleCreateZombies={handleCreateZombies} handleShowOwner={handleShowOwner}/>
      <ZombieList userAccount={userAccount} zombieIds = {currentZombieId} />
    </div>
    
  );
}

export default App;

