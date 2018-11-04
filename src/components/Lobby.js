// import React, { Component } from 'react'

// import Create from './Create'

// export default class Lobby extends Component {
//   componentDidMount = () => {
//     const { subscribeToNewGames } = this.props
//     console.log('hi')
//     subscribeToNewGames()
//   }

//   render() {
//     console.log(this.props.data)
//     const {
//       loading,
//       data: { games }
//     } = this.props
//     if (loading) return <div>Loading...</div>
//     return (
//       <>
//         <ul>
//           {games.map(({ id, status }) => (
//             <li>
//               {id}: <strong>{status}</strong>
//             </li>
//           ))}
//         </ul>
//         <Create />
//       </>
//     )
//   }
// }
