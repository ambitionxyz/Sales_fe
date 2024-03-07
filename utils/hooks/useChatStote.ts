import { create } from "zustand";

type Message = {
  usr: string;
  avatar: string;
  msg: string;
};

type Member = {
  name: string;
  avt: string;
};

type Action = {
  name: string;
  action: string;
};
interface ModalState {
  members: Member[];
  data: Message[];
}

interface ModalAction {
  onAddMember: (member: Member) => void;
  onHandleMembers: (action: Action) => void;
  onAddNewMessage: (message: Message) => void;
}

interface ChatStore extends ModalState, ModalAction {}

export const useChat = create<ChatStore>((set, get) => ({
  members: [],
  data: [],
  onHandleMembers: (action: Action) => {
    const members = useChat.getState().members;

    const existMember = members.find((member) => member.name === action.name);

    //exist
    if (existMember) {
      if (action.action === " join") return;
      if (action.action === "left") {
        const newMembers = members.filter(
          (member) => member.name !== existMember.name
        );

        set({ members: newMembers });
      }
    } else {
      if (action.action === "left") return;
      if (action.action === "join") {
        const newMember = { name: action.name, avt: mapImage(action.name) };
        const newMembers = [...members, newMember];
        set({ members: newMembers });
      }
    }

    // set((state) => ({
    //   members: [...state.members, member],
    // }));
  },

  onAddMember: (member: Member) =>
    set((state) => ({
      members: [...state.members, member],
    })),

  onAddNewMessage: (message: Message) => {
    const members = useChat.getState().members;
    const existMember = members.find((member) => member.name === message.usr);

    if (!existMember) {
      const newMember = { name: message.usr, avt: mapImage(message.usr) };
      const newMembers = [...members, newMember];
      set({ members: newMembers });
    }

    set((state) => ({
      data: [...state.data, message], // Thêm tin nhắn mới vào cuối mảng data
    }));
  },
}));

const mapImage = (loginName: string) => {
  let result = "";
  switch (loginName) {
    case "jimmy":
      result =
        "https://images.pexels.com/photos/19501713/pexels-photo-19501713/free-photo-of-th-i-trang-dan-ba-dem-t-i.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
      break;

    case "danny":
      result =
        "https://images.pexels.com/photos/18897390/pexels-photo-18897390/free-photo-of-th-i-trang-dan-ba-ngoai-d-ng.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
      break;

    case "admin":
      result =
        "https://images.pexels.com/photos/9180717/pexels-photo-9180717.jpeg?auto=compress&cs=tinysrgb&w=800";
      break;
  }

  return result;
};
