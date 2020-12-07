export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  Home: undefined;
  Sam: undefined;
  Login: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type TabSamParamList = {
  TabSamScreen: undefined;
};

export type TabLoginParamList = {
  TabLoginScreen: undefined;
  TabSamScreen: undefined;
};

export type Movie = {
  id: string;
  title: string;
  releaseYear: string;
}