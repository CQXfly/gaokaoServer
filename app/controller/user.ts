import { Controller } from "egg";

export default class UserController extends Controller {
    public async register() {
        this.logger.info('1');
    }

    public async login() {
        this.logger.info('1');
    }

    public async logout() {
        this.logger.info('1');
    }
}
