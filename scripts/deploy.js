const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "SmartTicket"
  const SYMBOL = "ST"

  // Deploy contract
  const SmartTicket = await ethers.getContractFactory("SmartTicket")
  const smartTicket = await SmartTicket.deploy(NAME, SYMBOL)
  await smartTicket.deployed()

  console.log(`Deployed SmartTicket Contract at: ${smartTicket.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Venture Capital World Summit",
      cost: tokens(3),
      tickets: 0,
      date: "Oct 23",
      time: "6:00PM EST",
      location: "Bengaluru, India"
    },
    {
      name: "Bussiness EXPO & Summit",
      cost: tokens(1),
      tickets: 125,
      date: "Oct 26-27",
      time: "1:00PM JST",
      location: "Mumbai, India"
    },
    {
      name: "TOKEN2049",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "10:00AM TRT",
      location: "Marina Bay Sands,Singpore"
    },
    {
      name: "Machine Learning summit",
      cost: tokens(5),
      tickets: 0,
      date: "Oct 17",
      time: "2:30PM CST",
      location: "Bengaluru, India"
    },
    {
      name: "ETH Global",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "9:00AM EST",
      location: "Dubai"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await smartTicket.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});