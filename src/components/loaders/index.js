import LottieView from "lottie-react-native"
import { animation } from "../../services/utilities/assets"
import { appStyles } from "../../services/utilities/appStyles"
import { View } from "react-native"

export const AbsolutePrimary = ({ isVisible }) => {
    return (
        <>
            {
                isVisible ?
                    <View style={appStyles.loadingContainer}>
                        <LottieView
                            source={animation}
                            autoPlay
                            loop
                            style={appStyles.loadingAnimation}
                        />
                    </View>
                    :
                    null
            }
        </>
    )
}