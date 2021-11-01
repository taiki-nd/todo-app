class Api::V1::TodoesController < ApplicationController

  def index
    todoes = Todo.order(updated_at: :desc)
    #アップデート順に並べたいため
    render json: todoes
    #todoesをjson形式で返したい
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else #今回は特に使用しませんが形式上書いておいきます。
      render json: todo.errors, status: 422
    end
  end

  def destroy
    if Todo.destroy(params[:id])
      head :no_content #特に何かを返すわけではないので
    else 
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all #全てのtodoを削除するためのアクションです
    if Todo.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:content, :complete)
  end

end