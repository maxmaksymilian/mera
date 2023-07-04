/* eslint-disable no-console */

const SocketPage = () => {
  const res = fetch(`https://ctc.centreoservice.com/api/Pok/getRoomID/6`);

  console.log(res);

  // const socket = io('https://ps.centreoservice.com', { reconnection: true });

  // socket.on('connect', () => {
  //   console.log(socket.connected);
  //   console.log(socket.disconnected);
  // });

  // socket.on('disconnect', (reason) => {
  //   if (reason === 'io server disconnect') {
  //     socket.connect();
  //     console.log(socket.connected);
  //   }
  // });

  // socket.emit('joinRoom', pokID, roomID, (data: any) => {
  //   console.log(data);
  // });

  // socket.on('token', (data) => {
  //   console.log(data);
  // });

  return <p>socket</p>;
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const res = await fetch(`https://ctc.centreoservice.com/api/Pok/getRoomID/6`);

//   let data: any = {};

//   if (res.ok) {
//     data = await res.json();
//   }

//   return {
//     props: {
//       id: data.id,
//       pokID: data.pokID,
//       paxID: data.paxID,
//       roomID: data.roomID,
//     },
//   };
// };

export default SocketPage;
