import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


//TODO 1: Add your own bearer token from the previous lesson.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-joke", async (req, res) => {
  const jokeAmt = req.body["amtJokes"];
  const language = req.body["selectLanguage"];
  const category = req.body.category  
  const categories = req.body.categories;
  var API_URL = "https://v2.jokeapi.dev/joke/";
  /*if (!req.body.type){
    console.log('Neither single nor two part jokes are selected');
    return;
  }*/
  //console.log(type);
  if (category === 'custom'){
    const numberOfSelectedCheckboxes = Array.isArray(categories) ? categories.length : 0;   
    if (numberOfSelectedCheckboxes > 0){
      const cateString = categories.join(',');
      API_URL = API_URL+cateString;
    }else{
      API_URL = API_URL+categories;
    }    
    //console.log(API_URL+cateString);
   
  }else{
    API_URL = API_URL+category;
  }
  try {   
    API_URL = API_URL+"?amount="+jokeAmt+"&lang="+language;
    const result = await axios.get(API_URL);
    console.log(result.data);
    console.log(API_URL);
    //res.render("index.ejs", { content: JSON.stringify(result.data) });
    res.render("index.ejs", { content: result.data });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.message) });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
