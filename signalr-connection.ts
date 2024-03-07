import * as signalR from "@microsoft/signalr";

const URL =
  // process.env.HUB_ADDRESS ??
  "http://localhost:4099/agentsChat?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJyb2xlIjpbIlNBTEVTTUFOIiwiVVNFUiJdLCJhdmF0YXIiOiJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy85MTgwNzE3L3BleGVscy1waG90by05MTgwNzE3LmpwZWc_YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZ3PTgwMCIsInVzZXJUeXBlIjoiU0FMRVNNQU4iLCJuYmYiOjE3MDk1Mzg1NzksImV4cCI6MTcxMDE0MzM3OSwiaWF0IjoxNzA5NTM4NTc5fQ.n62xYMyIWAeBcNlTBP48l0en7tRcy4q1EhT5HJjJPPw";
class Connector {
  public connection: signalR.HubConnection;
  public events: (
    onMessageReceived: (usr: string, avatar: string, msg: string) => void,
    onNotificationReceived: (msg: string) => void
  ) => void;

  static instance: Connector;
  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(URL)
      .withAutomaticReconnect()
      .build();
    this.connection.start().catch((err) => document.write(err));
    this.events = (onMessageReceived, onNotificationReceived) => {
      this.connection.on("ReceiveMessage", (usr, avatar, msg) => {
        onMessageReceived(usr, avatar, msg);
      });
      this.connection.on("ReceiveNotification", (msg) => {
        onNotificationReceived(msg);
      });
    };
  }
  public newMessage = (data: any) => {
    this.connection
      .invoke("SendMessage", data)
      .then((x) => console.log("sent"));
  };
  public static getInstance(): Connector {
    if (!Connector.instance) Connector.instance = new Connector();
    return Connector.instance;
  }
}
export default Connector.getInstance;
