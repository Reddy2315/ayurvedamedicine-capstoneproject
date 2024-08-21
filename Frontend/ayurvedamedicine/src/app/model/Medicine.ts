export interface Medicine {
    id:number,
    name:string,
    price:number,
    mfd:Date,
    expiryDate:Date,
    companyName:string,
    category:{
        name:string
    }
}