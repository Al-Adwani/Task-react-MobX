import axios from "axios";
import { makeObservable, observable, action } from "mobx";

class RoomStore {
  rooms = [];
  constructor() {
    makeObservable(this, {
      rooms: observable,
      fetchRooms: action,
      createRoom: action,
      deleteRoom: action,
      updateRoom: action,
      createMsg: action,
    });
  }
  fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      this.rooms.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  deleteRoom = async (id) => {
    try {
      await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );

      this.rooms = this.rooms.filter((room) => room.id !== id);
    } catch (error) {
      console.log(error);
    }
  };
  updateRoom = async (updatedRoom) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        updatedRoom
      );
      this.rooms = this.rooms.map((room) =>
        room.id === updatedRoom.id ? response.data : room
      );
    } catch (error) {
      console.log(error);
    }
  };
  createMsg = async (roomId, msg) => {
    try {
      const response = await axios.post(
        `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`,
        msg
      );
      const room = this.rooms.find((room) => room.id === roomId);
      room.messages.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };
}
const roomStore = new RoomStore();
export default roomStore;
