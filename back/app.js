const express = require("express");
// const test = require("./test");
var app = express();

const cors = require("cors");

// !!!!!!!!요청 허용 라우터보다 아래에 설정해주면 cors가 작동하지 않는다.!!!!!!!
app.use(cors({ origin: "http://3.36.72.252:3000", credentials: true }));

// public 폴더 내의 폴더 및 파일들의 경로를 절대경로로 호출할 수 있게 처리
app.use(express.static("public"));

// body 객체를 사용하기 위해 설정
app.use(express.urlencoded({ extended: false }));

// json 객체를 사용하기 위한 설정
app.use(express.json());

const { NtfRouter, FavoriteRouter } = require("./routers");

// 라우터 등록
app.use("/nft", NtfRouter);
app.use("/favorites", FavoriteRouter);

// db 불러오기
const db = require("./model/connect.js");
db();

app.listen(8000, () => {
  console.log("서버 연결");
});
