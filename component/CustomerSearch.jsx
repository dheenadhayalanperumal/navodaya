import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoanSearchApp = ({ data }) => {
  const [customerId, setCustomerId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);

  const searchByCustomerId = () => {
    const searchUserDetails = (customerId) => {
        if (!data || !data.route || !data.route.route_id) {
          return null;
        }
        const { route_id } = data.route;
        for (const routeKey in route_id) {
          const loans = route_id[routeKey];
          for (const loan of loans) {
            if (loan.customer_id === customerId) {
              return loan;
            }
          }
        }
        return null; // Return null if not found
      };
  
      const result = searchUserDetails(customerId);
      if (result) {
        setSearchResult(result);
        setError(null);
        alert('Customer ID found');
      } else {
        setSearchResult(null);
        setError('Customer ID not found');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.SearchInput}>
        <TextInput 
          style={styles.Searchtext} 
          value={customerId}
          onChangeText={setCustomerId}
          placeholder="Enter User ID" 
        />
        <TouchableOpacity
          style={styles.SearchButton}
          onPress={searchByCustomerId}
        >
          <Text style={styles.ButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {searchResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Customer Name: {searchResult.customer_name}</Text>
          <Text style={styles.resultText}>Customer ID: {searchResult.customer_id}</Text>
          <Text style={styles.resultText}>Collected Amount: {searchResult.collected_amt}</Text>
          <Text style={styles.resultText}>Date Created: {searchResult.date_created}</Text>
          <Text style={styles.resultText}>Time: {searchResult.time}</Text>
          <Text style={styles.resultText}>Route ID: {searchResult.route_id}</Text>
          <Text style={styles.resultText}>Loan Type: {searchResult.loan_type}</Text>
        </View>
      ) : (
        <Text style={styles.noResultText}>No customer found with ID: {customerId}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 35,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
  noResultText: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
    SearchInput: {
        flexDirection: "row",
    height: 41,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    },
    Searchtext: {
        height: 41,
    width: 233,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginLeft: 16,
    },
    SearchButton: {
        height: 41,
        width: 79,
        backgroundColor: "#FFAA10",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        margin: 16,
      },
      ButtonText: {
        color: "#000",
        textAlign: "center",
        fontSize: 16,
      },
});

export default LoanSearchApp;
