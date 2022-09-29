import { ProfileRepository, GetProfileRepository, GetFollowersRepository, GetUsersWhoLikedPostRepository } from "../../repository/profile/profile.repository";

export class ProfileService {
    profileModel = null;
    profileRepository
    constructor(profileModel) {
        if (!profileModel) {
            throw new BadRequestException("Provide profile credential")
        }
        this.profileModel = profileModel;
        this.profileRepository = new ProfileRepository(this.profileModel);
    }

    async init() {
        // postId -> param
        // emitEvents()
        if (await this.checkProfileExists()) {
            return `profile already created. you can update your profile`;
        }

        let profile = await this.saveProfile()
        if (profile) {
            return profile;
        }

        return "internal server error";
    }

    async saveProfile() {
        let profile = await this.profileRepository.saveProfile();
        return profile;
    }

    async checkProfileExists() {
        let profileExists = await this.profileRepository.checkProfileExists();
        return profileExists;
    }
}


export class GetProfileService {
    getProfileModel = null;
    getProfileRepository
    constructor(getProfileModel) {
        if (!getProfileModel) {
            throw new BadRequestException("Provide get profile credential")
        }
        this.getProfileModel = getProfileModel;
        this.getProfileRepository = new GetProfileRepository(this.getProfileModel);
    }

    async init() {
        // postId -> param
        let getProfile = await this.getProfile();
        if (getProfile) {
            return getProfile;
        }
        return false;
    }

    async getProfile() {
        let profile = await this.getProfileRepository.getProfile();
        return profile;
    }
}

export class GetFollowersService {
    getFollowersModel = null;
    getFollowersRepository
    constructor(getFollowersModel) {
        if (!getFollowersModel) {
            throw new BadRequestException("Provide get profile followers credential")
        }
        this.getFollowersModel = getFollowersModel;
        this.getFollowersRepository = new GetFollowersRepository(this.getFollowersModel);
    }

    async init() {
        // postId -> param
        let followers = await this.getFollowers();
        if (followers) {
            return followers;
        }
        return false;
    }

    async getFollowers() {
        let f = await this.getFollowersRepository.getFollowers();
        return f;
    }
}

export class GetUsersWhoLikedPostService {
    getUsersWhoLikedPostModel = null;
    getUsersWhoLikedPostRepository
    constructor(getUsersWhoLikedPostModel) {
        if (!getUsersWhoLikedPostModel) {
            throw new BadRequestException("Provide get profile followers credential")
        }
        this.getUsersWhoLikedPostModel = getUsersWhoLikedPostModel;
        this.getUsersWhoLikedPostRepository = new GetUsersWhoLikedPostRepository(this.getUsersWhoLikedPostModel);
    }

    async init() {
        // postId -> param
        let getWhoLikedPostResult = await this.getWhoLikedPost();
        if (getWhoLikedPostResult) {
            return getWhoLikedPostResult;
        }
        return false;
    }

    async getWhoLikedPost() {
        let f = await this.getUsersWhoLikedPostRepository.getWhoLikedPost();
        return f;
    }
}