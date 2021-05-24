import { addStashs, getStashs } from '../store'
/* ... */
const mapDispatchToProps = dispatch => {
  return {
    onaddStashs: infostashs => {
      dispatch(addStashs(infostashs))
    },
    ongetStashs: () => {
      dispatch(getStashs())
    }
  }
}

const ShopContainer = connect(mapStateToProps, mapDispatchToProps)(country)

export default ShopContainer