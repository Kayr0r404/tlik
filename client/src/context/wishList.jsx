import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState(
    localStorage.getItem('wishListItems') ? JSON.parse(localStorage.getItem('wishListItems')) : []
  );

  const addToWishList = (item) => {
    const isItemInWishList = wishListItems.find((wishListItem) => wishListItem.id === item.id);

    if (!isItemInWishList) {
      setWishListItems([...wishListItems, { ...item }]);
    }
  };

  const removeItemFromWishList = (item) => {
    const itemToBeRemoved = wishListItems.find((wishListItem) => item.id === wishListItem.id);

    if (itemToBeRemoved) {
        setWishListItems(wishListItems.filter((wishListItem) => item.id !== wishListItem.id));
    }
  };

  const clearWishList = () => {
    setWishListItems([]);
  };

  useEffect(() => {
    localStorage.setItem("wishListItems", JSON.stringify(wishListItems));
  }, [wishListItems]);

  useEffect(() => {
    const wishListItems = localStorage.getItem("wishListItems");
    if (wishListItems) {
      setWishListItems(JSON.parse(wishListItems));
    }
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishListItems,
        addToWishList,
        removeItemFromWishList,
        clearWishList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
