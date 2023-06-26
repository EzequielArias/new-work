import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowerService {
    constructor(private prisma : PrismaService){}

    async follow(currentUserId : string, personId : string){  
        try {

            // Follow the person selected.
             await this.prisma.following.create({
                data : {
                    accountId : currentUserId,
                    personId
                }
            })
            
            return true

        } catch (error) {
            console.log(error)
        }
    }

    async unfollow( personId : string){
        // We browse de record of a person to delete for unfollow.
        try {
            const record = await this.prisma.following.delete({
                where : {
                    id : personId
                }
            })

            return record
        } catch (error) {
            console.log(error)
        }
    }
}
