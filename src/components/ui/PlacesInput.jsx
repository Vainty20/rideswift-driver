import { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../../constants/color";

export default function PlacesInput({
  placeholder,
  onPlaceSelected,
  location = "16.0439, 120.3331",
  radius = "2000",
  country = "ph",
  errorMessage,
  currentAddress,
}) {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (autocompleteRef.current  && currentAddress !== undefined) {
      autocompleteRef.current.setAddressText(currentAddress);
    }
  }, [currentAddress]);

  return (
    <>
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder={placeholder}
        enablePoweredByContainer={false}
        suppressDefaultStyles
        fetchDetails
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY,
          language: "en",
          components: `country:${country}`,
          strictbounds: true,
          location: location,
          radius: radius,
          types: 'address',
        }}
        onPress={(data, details = null) => {
          if (details) {
            const { lat, lng } = details.geometry.location;
            onPlaceSelected({
              description: data.description,
              coordinates: [lat, lng],
            });
          }
        }}
        renderRow={(data) => (
          <View style={styles.itemView}>
            <Text style={styles.textItem}>{data.description}</Text>
          </View>
        )}
        textInputProps={{
          placeholderTextColor: Colors.textColor,
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    maxWidth: "100%",
  },
  listView: {
    backgroundColor: Colors.textColor,
    borderRadius: 12,
    marginTop: 12,
    padding: 12,
  },
  textInput: {
    minHeight: 60,
    height: 60,
    color: Colors.secondaryColor,
    backgroundColor: Colors.bgBase200,
    borderColor: Colors.secondaryColor,
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  textItem: {
    color: Colors.light,
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: Colors.textColor,
  },
});
