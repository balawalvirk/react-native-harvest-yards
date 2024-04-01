import { useEffect, useMemo, useState } from "react"
import firestore from '@react-native-firebase/firestore'
import { firestoreCollections, orderStatuses, useFirebaseAuth } from "../../../../services";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
export function useHooks() {
   const isFocused=useIsFocused()
    const navigation = useNavigation();

    const { user, auth } = useFirebaseAuth()

    //new
    const [pendingPickups, setPendingPickups] = useState(null)
    // const [favourites, setFavourites] = useState(null)
    //old
    const [selectedTouchable, setSelectedTouchable] = useState('Pending Pick-ups');
    const [isHelpCalloutModalVisible, setHelpCalloutModalVisible] = useState(false);
    const [showQRMainView, setShowQRMainView] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [reservedFoodData, setReservedFoodData] = useState([]);
    const [favoritesData, setFavoritesData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    //const [filteredData, setFilteredData] = useState([]);

    const isPendingPickupsTab = useMemo(() => selectedTouchable === 'Pending Pick-ups', [selectedTouchable])
    //fetch pending pickups / pending orders
    useEffect(() => {
        // Reference to the Firestore collection
        const collectionRef = firestore().
            collection(firestoreCollections.orders).
            where('userId', '==', user?.uid).
            where('status', '==', orderStatuses.pending)
            // orderBy("reservationDate", "asc")
            ;


        // Subscribe to changes in the collection
        const unsubscribe = collectionRef.onSnapshot((snapshot) => {
            if (snapshot && snapshot.docs) {
                const newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
               
        
                const currentDate = new Date();
                currentDate.setHours(currentDate.getHours() - 3);
                console.log('currentDate', currentDate);

        
                // Sort the data by reservationDate (client-side sorting)
                const sortedData = newData.sort((a, b) => a.reservationDate - b.reservationDate);
        
                // Filter items based on reservationDate
                const filteredItems = sortedData.filter(item => {
                    const reservationDate = new Date(item.reservationDate.toDate().toISOString());
                console.log('reservationDate', item.reservationDate.toDate().toISOString());

                    return reservationDate >= currentDate;
                });
        
        
                setPendingPickups(filteredItems);
                getDistributorData(filteredItems);
            } else {
                // Handle the case when snapshot is null or has no documents
                // console.error("Snapshot is null or has no documents.");
                setPendingPickups([]);
            }
        });
        


        // Unsubscribe when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means it runs once on mount

    const getDistributorData = async (ordersData) => {

        const _pendingPickups = ordersData
        const uniqueDistributorIds = new Set(_pendingPickups.map((order) => order.distributorId));
        const distributorIds = Array.from(uniqueDistributorIds);

        console.log('distributorIds: ', distributorIds)
        // Fetch distributor details from "distributors" collection
        const distributorPromises = distributorIds.map(async (distributorId) => {
            const distributorDoc = await firestore().collection(firestoreCollections.distributors).doc(distributorId).get();
            return {
                id: distributorId,
                data: distributorDoc.data(),
            };
        });

        // Wait for all distributor data promises to resolve
        const distributorDataList = await Promise.all(distributorPromises);

        // Update the pendingPickups with distributor details
        const updatedOrdersData = _pendingPickups.map((order) => {
            const distributorData = distributorDataList.find((distributor) => distributor.id === order.distributorId);
            return {
                ...order,
                //...distributorData.data,
                distributor: distributorData ? distributorData.data : null,
            };
        });

        setPendingPickups(updatedOrdersData);
        console.log('distributorIds:pendingPickups==== ', pendingPickups)

    };







    const handleCardPress = (item) => {
        if (selectedTouchable === 'Pending Pick-ups') {
            // Navigate to ReservedPickups screen with parameters for 'pending'
            navigation.navigate('AppNavigation', {
                screen: 'ReservedPickups',
                params: { item: { ...item, reservationDate: item.reservationDate.toDate() }, selectedTouchable: selectedTouchable }
            });
        } else if (selectedTouchable === 'Favorites') {
            // Navigate to Reservedfavorites screen with parameters for 'favourites'
            navigation.navigate('AppNavigation', {
                screen: 'Reservedfavorites',
                params: { item: item, selectedTouchable: selectedTouchable, reservationDate: item.reservationDate }
            });
        }
    };
    const onRefresh = () => {
        setRefreshing(true);
        // fetchDataFromFirestore();
        fetchFavorites();
        setRefreshing(false);
    };

    const fetchFavorites = async () => {
        try {
            setLoading(true);

            setLoadingAnimation(true);
            const currentUser = auth().currentUser;
            const userId = currentUser ? currentUser.uid : null;
            if (!userId) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'User ID not found',
                });
                return;
            }
            const userDocRef = firestore().collection('users').doc(userId);
            const userDoc = await userDocRef.get();
            const userData = userDoc.data();
            let favoritesArray = userData && userData.favorites ? userData.favorites : [];
            setFavoritesData(favoritesArray);
            setLoading(false);

            setLoadingAnimation(false);
        } catch (error) {
            setLoading(false);
            setLoadingAnimation(false);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to fetch favorites. Please try again.',
            });
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [isFocused]);


    const handleSearch = (text) => {
        const formattedQuery = text?.toLowerCase();
        console.log("formattedQuery",formattedQuery);
        setSearchQuery(formattedQuery);

        const filteredItems = isPendingPickupsTab
            ? pendingPickups.filter(item =>
                item?.distributor?.organization?.toLowerCase()?.includes(formattedQuery)
                // console.log("item>>>",item.distributor.organization)
            )
            : favoritesData.filter(item =>
                item?.organization?.toLowerCase()?.includes(formattedQuery)
               
            );

        //setFilteredData(filteredItems);
        return filteredItems
    };

    const filteredData = useMemo(() => {
        let _data = []
        if (searchQuery) {
            _data = handleSearch(searchQuery)
        }
        return _data
    }, [searchQuery, isPendingPickupsTab, pendingPickups, favoritesData])

    const viewableData = useMemo(() => {
        const _data = searchQuery !== '' ? filteredData : isPendingPickupsTab ? pendingPickups : favoritesData

        return _data
    }, [searchQuery, filteredData, isPendingPickupsTab, pendingPickups, favoritesData])

    return {
        //local states
        pendingPickups, setPendingPickups,
        selectedTouchable, setSelectedTouchable,
        isHelpCalloutModalVisible, setHelpCalloutModalVisible,
        showQRMainView, setShowQRMainView,
        refreshing, setRefreshing,
        loading, setLoading,
        loadingAnimation, setLoadingAnimation,
        reservedFoodData, setReservedFoodData,
        searchQuery, setSearchQuery,
        filteredData,
        favoritesData, setFavoritesData,

        //data
        viewableData,
        isPendingPickupsTab,

        //local methods
        handleCardPress,
        handleSearch,
        onRefresh
    }
}