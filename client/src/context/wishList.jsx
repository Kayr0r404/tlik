import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishListItems, setWishListItems] = useState(
    localStorage.getItem('wishListItems') ? JSON.parse(localStorage.getItem('wishListItems')) : []
  );
  const isAuthenticated = useContext(AuthContext);


  useEffect(() => {
    if (isAuthenticated){

        const fetchData = async () => {
          try {
            // Fetch the initial wishlist
            const response = await fetch('/get-wishlist', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
    
            if (!response.ok) return console.error('Failed to fetch wishlist:', response.statusText);
              const wishlist = await response.json();
    
              // Fetch details for each product in the wishlist
              const productDetails = await Promise.all(
                wishlist.map(async (item) => {
                  const res = await fetch(`/products/${item.product_id}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                  });
    
                  if (res.ok) {
                    return res.json();
                  }
                  return null;
                })
              );
    
              // Filter out any null responses (failed fetches) and update state
              setWishListItems(productDetails.filter((item) => item !== null));
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }
  }, [isAuthenticated]);

  const addToWishList = async (item) => {
    const isItemInWishList = wishListItems.find((wishListItem) => wishListItem.id === item.id);


    if (!isItemInWishList) {
		setWishListItems([...wishListItems, { ...item }]);
		if (isAuthenticated) {
			await fetch(`/add-wishlist`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(wishListItems),
			});
		}
    }
  };

  const removeItemFromWishList = async (item) => {
	const itemToBeRemoved = wishListItems.find((wishListItem) => item.id === wishListItem.id);

    if (itemToBeRemoved) {
		if (isAuthenticated) {
			await fetch(`/remove-item-wishlist/${itemToBeRemoved.id}`,{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
		}
        setWishListItems(wishListItems.filter((wishListItem) => item.id !== wishListItem.id));
    }
  };

  const clearWishList = async () => {
    if (isAuthenticated) {
		await fetch('/clear-wishlist', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
	});
    }
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
