/* eslint-disable require-jsdoc */

export default class Student {
  static async getAllStudent(options={}) {
    return {
      data: {
        message: 'this is working',
      },
    };
  }
  static async createStudent(options={}) {
    return await this.create(options);
  }
}

