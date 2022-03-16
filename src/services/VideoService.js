import http from "../common/http-common";
class VideoService {
    getAll() {
        return http.get("/videos");
      }

    getVideosByCategoryId(categoryId){
      return http.get("/videos/categories/"+categoryId);
    }

    saveVideos(videosInput){
      return http.post("/videos/",videosInput);
    }

    getCategories(){
      return http.get("/categories");
    }

    searchVideos(searchString){
      return http.get("/videos/search",{ params: { searchString: searchString } });
    }

    deleteVideo(videoUrl) {
      return http.delete("/videos/",{ params: { videoUrl: videoUrl } });
    }

    addCategory(category) {
      return http.post("/categories/",category);
    }
}

export default new VideoService();
