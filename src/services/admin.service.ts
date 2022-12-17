import { InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { collections } from "../db.service";
import { IAdmin } from "../interfaces";

class AdminServiceClass {

    sanitizeadmin(o: IAdmin): IAdmin {
        if(!o.favIconDocumentId) delete o.favIconDocumentId
        else o.favIconDocumentId = new ObjectId(o.favIconDocumentId)
        if (!o.logoDocumentId) delete o.logoDocumentId
        else o.logoDocumentId = new ObjectId(o.logoDocumentId)
        return o  
    }

    async get(adminId: string | ObjectId): Promise<IAdmin> {
        const query = { _id: new ObjectId(adminId) };
        return (await collections.admins.findOne(query)) as IAdmin;
    }

    async getByEmail(email: string): Promise<IAdmin> {
        return (await collections.admins.findOne({ email })) as IAdmin;
    }

    async getAll(): Promise<IAdmin[]> {
        return (await collections.admins.find({}).toArray()) as IAdmin[];
    }

    async create(newAdmin: IAdmin): Promise<IAdmin> {
        newAdmin = { ...newAdmin }
        if (!newAdmin.email) throw new Error(`Cannot create Admin without Email`)
        const existingAdmin: IAdmin = await this.getByEmail(newAdmin.email)
        if (existingAdmin) {
            throw new Error(`Admin with this email already exists`)
        }
        newAdmin.createdAt = Date.now()
        const result: InsertOneResult<IAdmin> = await collections.admins.insertOne(newAdmin);
        newAdmin._id = result.insertedId
        return newAdmin
    }

    async update(admin: IAdmin): Promise<boolean> {
        admin = { ...admin }
        let existingadmin: IAdmin = await this.getByEmail(admin.email)
        if (existingadmin && existingadmin._id.toString() !== admin._id.toString()) {
            throw new Error(`Admin with email ${admin.email} already exists`)
        }
        const query = { _id: new ObjectId(admin._id) };
        delete admin._id;
        let result: UpdateResult = await collections.admins.updateOne(query, { $set: admin });
        return (result.modifiedCount > 0)
    }

    async delete(adminId: string | ObjectId): Promise<boolean> {
        const query = { _id: new ObjectId(adminId) };
        const result = await collections.admins.deleteOne(query);
        return (result && result.deletedCount > 0)
    }

    async editProfile(profile: any): Promise<IAdmin> {   
        let ThisProf:IAdmin = await collections.admins.findOne({}) as IAdmin
        if(ThisProf!=undefined){
           if(ThisProf===undefined){
                ThisProf.seo={}
           }
           if(ThisProf.socialLinks===undefined){

               ThisProf.socialLinks={}
           }

            if(profile.name!=""){

                ThisProf.website_name = profile.name
            }
            if(profile.email!=""){
    
                ThisProf.website_email = profile.email
            }    
            if(profile.Address!= ""){
                ThisProf.address= profile.Address
            }
            if(profile.favIconDocumentId!=""){
                ThisProf.favIconDocumentId= profile.favIconDocumentId
            }
            if(profile.logoDocumentId!=""){
                ThisProf.logoDocumentId= profile.logoDocumentId
            }
            if(profile.seo!=undefined){
                ThisProf.seo=profile.seo
            }
            if(profile.socialLinks!=undefined){
                ThisProf.socialLinks= profile.socialLinks
            }
        }
        let result: UpdateResult = await collections.admins.updateOne( {},{
          $set: ThisProf,
        });  
        return (result.modifiedCount > 0) ? await collections.users.findOne() as IAdmin : ThisProf;
      }
      async getAdminDetails(): Promise<IAdmin> {
        return (await collections.admins.findOne()) as IAdmin;
    }
    async editPersonalInfo(profile: any): Promise<IAdmin> {   
        console.log(profile,"pro") 
        let ThisProf:IAdmin = await collections.admins.findOne({}) as IAdmin
        console.log(ThisProf,"ttt");
        if(ThisProf!=undefined){
            if(profile.personalAddress!==undefined){
                ThisProf.personalAddress=profile.personalAddress
            }
            if(profile.firstName!==undefined){
                ThisProf.firstName=profile.firstName
            }
            if(profile.lastName!==undefined){
                ThisProf.lastName=profile.lastName
            }
           if(profile.designation!==undefined){
            ThisProf.designation=profile.designation
           }
           if(profile.about!==undefined){
            ThisProf.about=profile.about
           }
          if(profile.phone!==undefined){
            ThisProf.phone=profile.phone
          }
          if(profile.profilePic!==undefined){
            ThisProf.profilePic=profile.profilePic
          }
        }
        try{
            let result: UpdateResult = await collections.admins.updateOne( {},{
                $set: ThisProf,
              });  
              console.log(result,"rrrrr");
              return (result.modifiedCount > 0) ? await collections.admins.findOne({}) as IAdmin : ThisProf;
        }catch(error){
            console.log(error);
            
        }
    
      }

    }

export let AdminService: AdminServiceClass = new AdminServiceClass()