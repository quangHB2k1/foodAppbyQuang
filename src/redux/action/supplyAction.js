import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import {fireStoreDatabase} from '../../firebase';
export const getRestaurant = restaurants => ({
  type: 'GET_RESTAURANT',
  payload: restaurants,
});

export const getFood = food => ({
  type: 'GET_FOOD',
  payload: food,
});
export const getCategory = category => ({
  type: 'GET_CATEGORY',
  payload: category,
});
export const GetTopFood = food => ({
  type: 'GET_TOPFOOD',
  payload: food,
});
export const getAllRestaurant = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStoreDatabase, 'Restaurant'),
      );

      const resturantLsit = querySnapshot.docs.map(doc => ({
        restaurantId: doc.id,
        ...doc.data(),
      }));

      dispatch(getRestaurant(resturantLsit));
    } catch (error) {
      console.error('Error :', error);
    }
  };
};
const getFoodIds = orderList => {
  const totalFoodIDs = orderList.reduce((accumulator, order) => {
    const {foodId, total_unit} = order;
    if (accumulator[foodId]) {
      accumulator[foodId] += total_unit;
    } else {
      accumulator[foodId] = total_unit;
    }
    return accumulator;
  }, {});
  // const length = Object.keys(totalFoodIDs).length;
  // for (let i = 0; i < length; i++) {
  //   for (let j = i; j < length - 1; j++) {}
  // }
  const topFiveId = Object.keys(totalFoodIDs).sort(function (a, b) {
    return totalFoodIDs[b] - totalFoodIDs[a];
  });
  return topFiveId.slice(0, 5);
};
export const getTopFood = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStoreDatabase, 'orderList'),
      );

      const orderList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
      }));
      const topFiveId = getFoodIds(orderList);
      dispatch(GetTopFood(topFiveId));
    } catch (error) {}
  };
};
export const getAllFood = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStoreDatabase, 'Food'),
      );

      const foodList = querySnapshot.docs.map(doc => ({
        foodId: doc.id,
        unit: 0,
        ...doc.data(),
      }));

      dispatch(getFood(foodList));
    } catch (error) {}
  };
};

export const getAllCategory = () => {
  return async dispatch => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStoreDatabase, 'Categories'),
      );
      const categoryList = querySnapshot.docs.map(doc => ({
        categoryId: doc.id,
        ...doc.data(),
      }));
      dispatch(getCategory(categoryList));
    } catch (error) {}
  };
};
