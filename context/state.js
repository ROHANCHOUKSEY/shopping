import {createGlobalState} from 'react-hooks-global-state';


const {setGlobalState, useGlobalState} = createGlobalState({ showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
})

export {useGlobalState, setGlobalState};
