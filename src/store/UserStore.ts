import { makeObservable, observable, computed, action, flow } from "mobx"
import { IUser } from "../shared/interfaces/user.interfase"

class UserStore {
    user: IUser | null = null

    constructor(user?: IUser) {
        makeObservable(this, {
            user: observable,
            getUserInfo: computed,
            setUserUnfo: action,
            resetUserInfo: action
        })
        this.user = user || null
    }

    get getUserInfo() {
        return this.user
    }

    setUserUnfo(user: IUser) {
        this.user = user
    }

    resetUserInfo() {
        this.user = null
    }
}

const userStore = new UserStore()
export default userStore;