import React, { useEffect, useRef, useState } from "react";
import "./Assistant.css"
import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, Icon, Spacer, Slide, SlideFade } from "@chakra-ui/react";
import { BsChatSquareText } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { BeatLoader } from "react-spinners";
// import { useInitTransformers, useEmbeddQ } from "./functions";
// import { ActorSubclass } from "@dfinity/agent";
// import { _SERVICE } from "./types";
var userInput: String = ""

export interface assistantProp {
	color: string,
	companyName: string,
	companyId: number,
	// actor: ActorSubclass<_SERVICE> | undefined;
}

type ChatType = {
	sender: "you" | "nexai",
	text: string
}
export const Assistant = (prop: assistantProp) => {
	const [isChatVisible, setIsChatVisible] = useState(false);
	const [inputMessage, setInputMessage] = useState("");
	const [chat, setChat] = useState<ChatType[]>([]);
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState("")
	const scrollableRef = useRef<HTMLDivElement | null>(null);
	// const { init } = useInitTransformers()
	//@ts-ignore
	// const { call, embeddedQ } = useEmbeddQ()

	// userInput = inputMessage

	const toggleChatVisibility = () => {
		setIsChatVisible(!isChatVisible);
	};

	// Handle changes to the input field
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputMessage(event.target.value);
	};

	// Handle sending a message
	const handleSendMessageFromUser = async () => {
		inputMessage.trim();
		// assign userInput here
		userInput = inputMessage;

		var newMessage: ChatType = {
			sender: "you",
			text: inputMessage
		}
		setChat([...chat, newMessage])
		setLoading(true);
		setInputMessage("");

		// await call(inputMessage);
		// if (embeddedQ[0].length == 384) {
		// 	setInputMessage("");
		// 	prop.actor?.VDBGetSimilar(prop.companyId, embeddedQ[0], 1).then((d: any) => {
		// 		let message: ChatType = {
		// 			sender: "nexai",
		// 			tES2015ext: "",
		// 		};
		// 		if (d.Ok[0][0] < 0.5) {
		// 			message = {
		// 				sender: "nexai",
		// 				text: "I apologize for not being able to assist with your question. If you need further help, please contact our support team.",
		// 			};
		// 		} else {
		// 			message = {
		// 				sender: "nexai",
		// 				text: d.Ok[0][1],
		// 			};
		// 		}
		// 		setChat([...chat, message]);
		// 		setLoading(false)
		// 	}).then((err: any) => {
		// 		const message: ChatType = {
		// 			sender: "nexai",
		// 			text: "unfortunately, something went wrong, please try again"
		// 		}
		// 		setChat([...chat, message])
		// 		console.log(err);
		// 		setLoading(false)
		// 	})



		// }
	};

	useEffect(() => {
		if (scrollableRef.current) {
			scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
		}
	}, [chat]);


	useEffect(() => {
		const call = async () => {
			// await init();
		}
		call()
	}, [])

	const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			// userInput = inputMessage
			// console.log(userInput)
			handleSendMessageFromUser();

		}
	};

	return (
		<Box>
			<SlideFade in={isChatVisible} offsetY='4px' transition={{ exit: { duration: .5 }, enter: { duration: .5 } }}>
				<Box className={`chat`} h={`450px`} w={`300px`} minW={`280px`} pos={`fixed`} bottom={`80px`} right={`${isChatVisible ? "10px" : "25px"}`} borderRadius={`5px`} zIndex={`1000`}>
					<Flex h={`15%`} p={`10px`} bg={`${prop.color}`} className="chat-header" borderTopRadius={5} alignItems={`center`}>
						<Text as='b' color={`white`} fontSize={`20px`}>{prop.companyName}</Text>
					</Flex>
					<Box h={`70%`} bg={'gray.300'} className="chat-header" p={3} overflow={`scroll`} ref={scrollableRef}>
						{chat.map((message, index) => (
							<Flex
								key={message.text}
								justifyContent={
									message.sender == "nexai" ? "flex-start" : "flex-end"
								} pb={1}
							>
								<Box
									py={4}
									px={5}
									bgColor={
										message.sender == "nexai" ? `#331A41a6` : "green.300"
									}
									borderRadius="10px"
									maxW="60%"
									overflow={`visible`}
								>
									<Text color={`white`}>{message.text}</Text>
								</Box>
							</Flex>
						))}
						{loading && (
							<Flex justifyContent="flex-start">
								<BeatLoader size={8} color="#341A41" />
							</Flex>
						)}
					</Box>

					<Flex h={`15%`} bg={'white'} className="chat-box" borderBottomRadius={5} alignItems={'center'} border={`1px solid ${prop.color}10`}>
						<InputGroup size='md' px={4}>
							<Input
								pr='4.5rem'
								type="text"
								value={inputMessage}
								onChange={handleInputChange}
								placeholder='Ask Your Question'
								onKeyDown={handleInputKeyPress}
								variant='flushed'
							// ${}
							/>
							<InputRightElement width='5p' pe={3}>
								<Button h='100%' size='sm' bg={`${prop.color}`} color={`white`} _hover={{ backgroundColor: "transparent", border: `${prop.color}`, color: `${prop.color}` }} onClick={handleSendMessageFromUser}>
									Send
								</Button>
							</InputRightElement>
						</InputGroup>
					</Flex>
				</Box>
			</SlideFade>
			<Flex className={`spot ${isChatVisible ? "spot-visible" : ""}`} alignItems={'center'} onClick={toggleChatVisibility} bg={`${!isChatVisible ? `${prop.color}` : "#FFF"}`} >
				<Icon as={!isChatVisible ? BsChatSquareText : AiOutlineClose} boxSize={7} m={`auto`} color={`${isChatVisible ? `${prop.color}` : "#FFF"}`} />
			</Flex>
		</Box>
	)
}

export { userInput }

// export default Assistant;