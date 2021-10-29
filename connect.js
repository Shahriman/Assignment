const mongoose  =  require ('mongoose');   
const db =  "mongodb+srv://testing123:testing123@testing.wytbv.mongodb.net/FuckingHell?retryWrites=true&w=majority" ; 
  
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Mongoose connetion error: ', error);
  });

  const foodSchema = new mongoose.Schema ({         
    title: {type: String}, 
    image: {type:String}, 
    area: {type:String}, 
    instructions: {type:String}

 } 
);

  const Menu = mongoose.model('Food', foodSchema);

  module.exports = Menu; 

 
  
 
      

  
 
  
 
      

 
