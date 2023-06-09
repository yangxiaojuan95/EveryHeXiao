declare namespace PageModel {
  type SceneItem = {
    id: number;
    title: string;
    visible: boolean;
  }
  
  type Scene = {
    custum: boolean;
    scenes: SceneItem[];
  }
  
}
