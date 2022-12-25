/* eslint-disable require-jsdoc */

export default class Teacher {
  static async getAllStudent(options={}) {
    return {
      data: {
        message: 'this is working',
      },
    };
  }
  static async createTeacher(options={}) {
    return await this.create(options);
  }
}
