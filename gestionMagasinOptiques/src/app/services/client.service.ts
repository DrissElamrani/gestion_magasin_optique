export class ClientsSrvices {
    clientss =[
{
    id:1,
    name:'khadija',
    prenom:'saidi',
    ville :'rabat',
    email :'khadija@gmail.com',
    sexe  :'femelle',
    cin   : 'c114584',
    addresse:'BV hassan 2 rabat',
    numeroTel:'0642138855'

},
{
    id:2,
    name:'said',
    prenom:'alaoui',
    ville :'fes',
    email :'said@gmail.com',
    sexe  :'male',
    cin   : 'cd11554',
    addresse:'BV chefchaouni fes',
    numeroTel:'0645131313'
},
{
    id:3,
    name:'driss',
    prenom:'elamrani',
    ville :'casablanca',
    email :'driss@gmail.com',
    sexe  :'male',
    cin   : 'cn11545',
    addresse:'zerktouni Maarif casablanca',
    numeroTel:'0665131545'
}
];

enregestrerClient(name:string,prenom:string,ville:string,email:string,sexe:string,cin:string,addresse:string,numeroTel:string)
{

    const clientObject={
        id:0,
        name:'',
        prenom:'',
        ville :'',
        email :'',
        sexe  :'',
        cin :'',
        addresse:'',
        numeroTel

    };
    if(this.clientss.length>=1){
    clientObject.id=this.clientss[(this.clientss.length - 1)].id + 1;
}    else {
    clientObject.id=1;}
    clientObject.name=name;
    clientObject.prenom=prenom;
    clientObject.ville=ville;
    clientObject.email=email;
    clientObject.sexe=sexe;
    clientObject.cin=cin;
    clientObject.addresse=addresse;
    clientObject.numeroTel=numeroTel;
    this.clientss.push(clientObject);
    
}
editClient(id:number,name:string,prenom:string,ville:string,email:string,sexe:string,cin:string,addresse:string,numeroTel:string)
{

    const clientObject={
        id:0,
        name:'',
        prenom:'',
        ville :'',
        email :'',
        sexe  :'',
        cin :'',
        addresse:'',
        numeroTel

    };
    clientObject.id=this.clientss[(this.clientss.length - 1)].id + 1;
    clientObject.name=name;
    clientObject.prenom=prenom;
    clientObject.ville=ville;
    clientObject.email=email;
    clientObject.sexe=sexe;
    clientObject.cin=cin;
    clientObject.addresse=addresse;
    clientObject.numeroTel=numeroTel;
    this.clientss.push(clientObject);
}
rechercherClientById(id :number)
{
    const client =this.clientss.find(
    (clientObject)=>{
    return clientObject.id===id;
}
);

return client;
} 
supprimerClient(i :number)
{
        this.clientss.splice(i,1);
}

}