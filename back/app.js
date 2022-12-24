const express = require("express");
const test = require("./test");
var app = express();

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const db = require("./model/connect.js"); // db 불러오기
db();

// 테스트 코드. 지울 것.
// const { TransferService } = require("./services");

//               테스트 코드. 지울 것.
app.listen(
  8000,
  /*async*/ () => {
    console.log("서버 연결");
    test.test();
    // 테스트 코드. 지울 것.
    // const result = await TransferService.create({nftId : 11, transactionHash : "transactionHash",type : "type",  price : 1, from : "from", to : "to" })
    // console.log(result);
    // console.log(".......................");
    // console.log(await TransferService.get("transactionHash"));
    // console.log(".......................");
    // console.log(await TransferService.getList());
  }
);
