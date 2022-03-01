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
}

export default new VideoService();
