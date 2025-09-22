import FlipbookContainer from './components/FlipbookContainer';
import MainUILayout from './components/MainUILayout';
import PageThumbnailNavigator from './components/PageThumbnailNavigator';
import { FlipbookProvider } from './context/FlipbookContext';

function App() {
  return (
    <FlipbookProvider>
      <div className="w-screen h-screen bg-gray-200">
        <MainUILayout />
        <FlipbookContainer />
        <PageThumbnailNavigator />
      </div>
    </FlipbookProvider>
  );
}

export default App;