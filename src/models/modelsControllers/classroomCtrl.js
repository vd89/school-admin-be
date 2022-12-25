/* eslint-disable require-jsdoc */

export default class ClassRoom {
  static async getAllClassRoom(options={}) {
    return {
      data: {
        message: 'this is working',
      },
    };
  }

  static async createClassRoom(options={}) {
    const { classRoomName, studentCount, subject } = options;
    return await this.create({
      classRoomName,
      numberOfStudent: studentCount,
      classSubject: subject,
    });
  }
}
