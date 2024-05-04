import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const articleSchema = mongoose.Schema(
    {
        name :{type : String , require : true},
        content : {type : String , require : true},
        category : {type : String , require : true},
        brand : {type : String , require : true},
        price : {type : Number , require : true},
        user : {type :mongoose.Schema.Types.ObjectId, ref:'User'},
        // avis : {type :mongoose.Schema.Types.ObjectId, ref:'Avis' , require : true},
        picture : [{
            img : {type : String , require : true},
            img1 : {type : String , require : false},
            img2 : {type : String , require : false},
            img3 : {type : String , require : false},
            img4 : {type : String , require : false},
    }],
        status : {type : Boolean , require : true},
        stock : {type : Number , require : true},
    }
)

articleSchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Article' , articleSchema)

// {
// 	name: <= Représente le nom de l'article 
// 	content:  <= Représente la description de l'article
// 	category: <= Représente la catégorie de l'article
// 	brand: <= Représente la marque de l'article
// 	price: <= Représente le prix de l'article
// 	user: <= Représente l'utilisateur qui à posté l'article
// 	avis: <= Représente l avis posté par les internautes sur le produit 
// 	( comprend une note sur 5 et un message ) 
// 	picture: <= un article doit avoir une image principale 
// 	et minimum deux sous image en plus  
// 		img: <= Représente l'image principale de l'article
// 		img1: (obligation non), <= Représente la 2eme image de l'article
// 		img2: (obligation non), <= Représente la 2eme image de l'article
// 		img3: (obligation non), <= Représente la 2eme image de l'article
// 		img4: (obligation non), <= Représente la 2eme image de l'article
// 	status: (boolean), <= Représente le statut de de l'article (online or not)
// 	stock: <= Représente le nombre d'article
// }