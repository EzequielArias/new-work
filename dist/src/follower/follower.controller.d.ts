import { FollowerService } from './follower.service';
import { PersonData } from './types';
export declare class FollowerController {
    private FollowerService;
    constructor(FollowerService: FollowerService);
    follow(personData: PersonData, userId: string): Promise<import("../interfaces/custom.response").ResponseData<string>>;
    unfollow(personData: PersonData, userId: string): Promise<import("../interfaces/custom.response").ResponseData<string>>;
    getFollowersData(currentUserId: string): Promise<import("../interfaces/custom.response").ResponseData<any>>;
}
