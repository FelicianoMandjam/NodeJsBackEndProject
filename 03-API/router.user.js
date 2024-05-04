import express from "express";

const router = express.Router();

const data = [
    {
      id: 1,
      name: "Izuku",
      email: "Izuku@yahoo.com"
    },
    {
      id: 2,
      name: "Drake",
      email: "Drake@yahoo.com",
    },
    {
      id: 3,
      name: "Marion",
      email: "Marion@yahoo.com",
    },
  ];

//   GET (Récupérer dezs données)
// Ajouter POST (Ajouter une donnée en BDD)
// Ajouter PUT (pour modifier des données)
// Ajouter DELETE (Pour supprimer)


router.get("/all", (req, res) => {
  res.status(200).json(data);
});

router.post("/add", (req, res) => {
    // Code to add new user
    //   console.log(req.body)
    //   const arrayData = [...data , req.body]
    data.push(req.body)
    res.status(201).json(data);
});

router.put("/update/:id", (req , res ) => {
    const id = req.params.id
    // const { id } = req.params
    const name = req.body.name
    const checkIsExist = data.some(user => user.id == id)

    if (checkIsExist){
        let resultat = data.filter(user => {
            if(user.id == id){
                user.name = name 
            }
            return user
        })
        res.status(200).json(resultat)
    }
    if(!checkIsExist) res.status(404).json({message : 'user not found'})
})


router.delete("/delete/:id", (req,res) => {
    const {id} = req.params
    const checkExiste = data.some(user => user.id == id);
    if(checkExiste){
        const result = data.filter(user => user.id != id)
        res.status(200).json(result)

        // Method MK
        // data.map((user, index) => {
        //     if(user.id == id){
        //         data.splice(index,1);
        //         res.status(200).json({data});
        //         res.end();
        //     }
        // })
    }
    if(!checkExiste) res.status(404).json({message: 'user not found !'});
})

export default router;
