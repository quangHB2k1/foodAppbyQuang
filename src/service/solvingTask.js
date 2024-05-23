import {Timestamp, addDoc, collection} from '@firebase/firestore';
import {fireStoreDatabase} from '../firebase';

export const getFoodByRes = (restaurantId, foodList) => {
  if (foodList && foodList.length > 0) {
    const menu = foodList.filter(food => food.restaurantId === restaurantId);
    return menu.length > 0 ? menu : [];
  }
};
export const getFoodByCate = (categoryId, foodList) => {
  const foodsByCategory = foodList.filter(
    food => food.categoryId === categoryId,
  );
  return foodsByCategory.length > 0 ? foodsByCategory : [];
};
export const getFinalAmount = cart => {
  const totalPrice = cart.reduce(
    (accumulator, food) => accumulator + food.unit * food.price,
    0,
  );
  return totalPrice;
};
export const sendingOrder = async (cartbyRestaurant, userData) => {
  const orderList = cartbyRestaurant;

  try {
    for (const order of orderList) {
      const restaurantId = Object.keys(order)[0];
      const orderRef = await addDoc(collection(fireStoreDatabase, 'orders'), {
        userId: userData.userId,
        restaurantId: restaurantId,
        totalPrice: await getFinalAmount(Object.values(order)[0]),
        order_date: Timestamp.fromDate(new Date()),
      });
      const foodList = Object.values(order)[0];
      for (const food of foodList) {
        await addDoc(collection(fireStoreDatabase, 'orderList'), {
          orderId: orderRef.id,
          userId: userData.userId,
          foodId: food.foodId,
          total_unit: food.unit,
          order_date: Timestamp.fromDate(new Date()),
        });
      }
    }
    return {
      success: true,
      message: `Chúc mừng ${userData.userName} đã đặt hàng thành công!`,
    };
  } catch (error) {
    return {success: false, message: JSON.stringify(error)};
  }
};

export const renderTopFood = ({foodIdList, foodList}) => {
  const topFoodList = [];
  for (let foodId of foodIdList) {
    const foodID = foodList.find(food => food.foodId === foodId);
    if (foodID) {
      topFoodList.push(foodID);
    }
  }
  console.log('found :  ' + JSON.stringify(topFoodList));
  return topFoodList && topFoodList;
};
