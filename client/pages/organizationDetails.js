import React, { useState, useEffect } from "react";
import moment from "moment";
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";

import Card from "../components/card";
import Button from "../components/button";
import AsyncStorage from "@react-native-community/async-storage";
import cardStyles from "../styles/cardStyles";
import styles from "../styles/globalStyles";
import { vh, vw } from "react-native-expo-viewport-units";

export default function OrganizationDetails(props) {
	const [id, setID] = useState();
	const [data, setData] = useState();
	if (!id) {
		setID(props.navigation.getParam("_id"));
	}

	const fetchData = async () => {
		const url = `http://159.203.16.113:3000/organizations/getOrg?id=${id}`;
		let jwt = await AsyncStorage.getItem("Token").catch((err) => {
			console.log(err);
		});
		try {
			let response = await fetch(url, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			let data = await response.json();
			setData(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
		props.navigation.addListener("willFocus", () => {
			fetchData();
		});
	}, []);
	// empty array makes it so that the page doesn't rerender upon update instead renders upon component mounting

	if (!data) {
		return null;
	}

	const users = data.users.map((user) => (
		<View style={{ alignItems: "center" }} key={user.email}>
			<Text style={{ fontStyle: "italic", marginBottom: vh(1) }}>
				{user.username}
			</Text>
		</View>
	));
	const ballots = data.activeBallots.map((ballot) => (
		<TouchableOpacity
			key={ballot._id}
			onPress={() =>
				props.navigation.navigate("votingPage", { _id: ballot._id })
			}
		>
			<Card key={ballot._id}>
				<Text numberOfLines={1} style={styles.textSubtitleBallot}>
					{ballot.title}
				</Text>
				{ballot.hasVoted ? (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<Text style={{ fontSize: 15 }}>✅ Status: Voted</Text>
						</Text>
					</View>
				) : (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<Text>
							<Text style={{ fontSize: 15 }}>❌ Status: Not Voted</Text>
						</Text>
					</View>
				)}
				<Text
					numberOfLines={3}
					style={{
						...cardStyles.textOrgDesc,
						textAlign: "center",
						marginTop: vh(1.5),
					}}
				>
					{ballot.description}
				</Text>
				<Text style={{ textAlign: "center" }}>
					Voting ends {moment(ballot.endTime).calendar()} (
					{moment(ballot.endTime).fromNow()})
				</Text>
			</Card>
		</TouchableOpacity>
	));

	return (
		<View style={styles.containerOrgDesc}>
			<Image
				source={require("../assets/background-logged-in.jpg")}
				style={styles.organizationBackgroundImage}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						...styles.textTitleOrgDetails,
						color: "white",
						marginHorizontal: vw(5),
					}}
				>
					{data.name}
				</Text>

				<Card>
					<View style={{ alignItems: "center" }}>
						<Text style={cardStyles.textOrgDesc}>{data.description}</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Your Representative: </Text>{" "}
							{data.representatives[0].username}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>User Count: </Text>
							{data.memberCount}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Invite Code: </Text>{" "}
							{data.inviteCode}
						</Text>
						<Text style={styles.organizationDetailsContainer}>
							<Text style={{ fontWeight: "bold" }}>Date Created: </Text>{" "}
							{moment(data.createdDate).format("MMM Do YYYY")}
						</Text>
					</View>
				</Card>
				<View style={styles.br} />

				<Text style={styles.BallotTitle}>Active Ballots</Text>

				{Object.keys(ballots).length === 0 ? (
					<Card>
						<Text style={{ color: "grey", fontSize: 16, textAlign: "center" }}>
							There are no active ballots right now.
						</Text>
					</Card>
				) : (
					ballots
				)}

				<View style={styles.imageTitle}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate("createBallot", {
								_id: props.navigation.getParam("_id"),
								// retrieveData: retrieveData,
								// setData: setData,
							});
						}}
					>
						<Text
							style={{
								...styles.BallotTitle,
								fontSize: 20,
								margin: vw(2.2),
								marginTop: 0,
								marginBottom: 0,
							}}
						>
							+ Add New Ballot
						</Text>
					</TouchableOpacity>
				</View>
				<Button
					text="View Completed Ballots"
					onPress={() => {
						console.log(data.name);
						props.navigation.navigate("ballotList", {
							_id: id,
						});
					}}
				/>

				<View style={{ marginTop: vh(1.8) }}>
					<Card>
						<Text style={styles.OrgDescUserListTitle}>Users List:</Text>
						{users}
					</Card>
				</View>
			</ScrollView>
		</View>
	);
}
