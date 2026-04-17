export interface WBS {
  type: 'notificacion' | 'chat' | 'status' | 'error';
  payload: string;
}
