export class User{

    constructor(
        public idUser: string,
        public fullName: string,
        public email: string,
        public aboutMe: string,
        public status: string,
        public userName: string,
        public idImage: string,
        public urlImage: string,
        public idWallpaper: string,
        public urlWallpaper: string,
        public password: string,
        public createDate: Date,
        public role: string,
        public active: boolean
    ){
        this.idUser = idUser;
        this.fullName = fullName;
        this.email = email;
        this.aboutMe = aboutMe;
        this.status = status;
        this.userName = userName;
        this.idImage = idImage;
        this.urlImage = urlImage;
        this.idWallpaper = idWallpaper;
        this.urlWallpaper = urlWallpaper;
        this.password = password;
        this.createDate = createDate;
        this.role = role;
        this.active = active;
    }

}
