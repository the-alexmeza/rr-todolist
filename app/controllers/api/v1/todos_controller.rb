class Api::V1::TodosController < ApplicationController
    before_action :set_todo, only: [:show, :edit, :update, :destroy]

    # Always returning JSON as a response for the React components

    # GET /todos
    # GET /todos.json
    def index
        @todos = Todo.all.order(created_at: :desc)
        render json: @todos
    end

    # GET /todos/1
    # GET /todos/1.json
    def show
        if @todo
            render json: @todo
        else
            render json: @todo.errors
        end
    end

    # GET /todos/new
    def new
        @todo = Todo.new
    end

    # GET /todos/1/edit
    def edit
    end

    # POST /todos
    # POST /todos.json
    def create
        @todo = Todo.new(todo_params)

        if @todo.save
            render json: @todo
        else
            render json: @todo.errors
        end
    end

    # PATCH/PUT /todos/1
    # PATCH/PUT /todos/1.json
    def update
    end

    # DELETE /todos/1
    # DELETE /todos/1.json
    def destroy
        @todo.destroy

        render json: {notice: 'Todo was successfully removed.'}
    end

    private
        def set_todo
            @todo = Todo.find(params[:id])
        end

        def todo_params
            params.permit(:title, :body, :isComplete)
        end
end
