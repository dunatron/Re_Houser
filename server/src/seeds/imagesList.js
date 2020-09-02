const idOne = "1";

const houseImage1 = {
  // id: idOne,
  filename: "house image 1",
  encoding: "encoding",
  mimetype: "image/jpeg",
  url:
    "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1596422419/we7nndiaebaag9o0bmbj.jpg",
};

const houseImage2 = {
  // id: "2",
  filename: "house image 1",
  encoding: "encoding",
  mimetype: "image/jpeg",
  url:
    "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1596421982/e94p9wye1wwjqnjg0ul0.jpg",
};

const houseImage3 = {
  // id: "3",
  filename: "house image 1",
  encoding: "encoding",
  mimetype: "image/jpeg",
  url:
    "https://res.cloudinary.com/dkhe0hx1r/image/upload/v1594107391/k4zya7fozouepdebhtqe.jpg",
};

// filename: String!
// mimetype: String!
// encoding: String!

const imagesList = [houseImage1, houseImage2, houseImage3];

module.exports = process.env.STAGE === "dev" ? imagesList : [];
// module.exports = imagesList;
